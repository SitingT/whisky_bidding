from rest_framework import serializers
from .models import User
from .models import WhiskyDetail, Bid


class WhiskyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhiskyDetail
        fields = '__all__'


class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UserID', 'Username', 'Email', 'Password', 'UserType',
                  'RegistrationDate', 'LastLoginDate', 'IsBlocked', 'OverallRating']
        extra_kwargs = {'Password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create(
            Username=validated_data['Username'],
            Email=validated_data['Email'],
            # Consider using set_password here for hashing
            Password=validated_data['Password'],
            UserType=validated_data.get('UserType', 'Normal'),
            RegistrationDate=validated_data['RegistrationDate'],
        )
        user.save()
        return user
