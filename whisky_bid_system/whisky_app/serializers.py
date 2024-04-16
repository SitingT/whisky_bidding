from .models import Review, User
from .models import Transaction, PaymentMethod
from rest_framework import serializers
from .models import User
from .models import WhiskyDetail, Bid, Review
from django.contrib.auth import get_user_model
from rest_framework import serializers


class BidSerializer(serializers.Serializer):
    BidID = serializers.IntegerField()
    ItemID = serializers.IntegerField()
    BidAmount = serializers.DecimalField(max_digits=10, decimal_places=2)
    BidTime = serializers.DateTimeField()
    AuctionStatus = serializers.CharField(max_length=20)
    BidStatus = serializers.CharField(max_length=20)


class WhiskyDetailSerializer(serializers.ModelSerializer):
    Current_bid = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = WhiskyDetail
        fields = '__all__'


class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    PaymentMethodID = PaymentMethodSerializer()

    class Meta:
        model = Transaction
        fields = '__all__'

    def create(self, validated_data):
        payment_method_data = validated_data.pop('PaymentMethodID')
        payment_method_id = payment_method_data.get('MethodID', None)
        if payment_method_id:
            payment_method = PaymentMethod.objects.get(
                MethodID=payment_method_id)
        else:
            payment_method_serializer = PaymentMethodSerializer(
                data=payment_method_data)
            if payment_method_serializer.is_valid(raise_exception=True):
                payment_method = payment_method_serializer.save()
            transaction = Transaction.objects.create(
                PaymentMethodID=payment_method, **validated_data)
        return transaction


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'is_staff',
                  'registration_date', 'overall_rating']
        extra_kwargs = {
            'overall_rating': {'required': False, 'allow_null': True}
        }


class WhiskyTransSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhiskyDetail
        fields = ['ItemID', 'Description',
                  'Category', 'AuctionStatus', 'HighestBid']


class TransactionDisplaySerializer(serializers.ModelSerializer):
    item_details = WhiskyTransSerializer(source='ItemID', read_only=True)

    class Meta:
        model = Transaction
        fields = ['TransactionID', 'FinalPrice',
                  'TransactionStatus', 'PaymentStatus', 'item_details', 'SellerID',]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['ReviewID', 'ReviewerID',
                  'RevieweeID', 'ItemID', 'Rating', 'Comment']


class CustomReviewSerializer(serializers.ModelSerializer):
    ReviewerName = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['Rating', 'Comment', 'ReviewerName']

    def get_ReviewerName(self, obj):

        return obj.ReviewerID.name


class GetReviewSerializer(serializers.ModelSerializer):
    RevieweeName = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['ReviewID', 'Rating', 'Comment', 'ItemID', 'RevieweeName']

    def get_RevieweeName(self, obj):

        return obj.RevieweeID.name if obj.RevieweeID else None


class ReviewSoftDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['isDeleted']
        read_only_fields = ['ReviewID', 'ReviewerID', 'RevieweeID',
                            'ItemID', 'Rating', 'Comment', 'CommentTime']
