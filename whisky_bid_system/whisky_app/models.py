from django.db import models
from django.utils import timezone

# # UserManager for custom user management functionalities


class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=255)
    Email = models.EmailField(unique=True)
    Password = models.CharField(max_length=255)
    UserType = models.CharField(max_length=10, choices=[
        ('Admin', 'Admin'), ('Normal', 'Normal')])
    RegistrationDate = models.DateTimeField()
    LastLoginDate = models.DateTimeField(null=True, blank=True)
    IsBlocked = models.BooleanField(default=False)
    OverallRating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = 'Users'


class WhiskyDetail(models.Model):
    ItemID = models.AutoField(primary_key=True, db_column='ItemID')
    SellerID = models.ForeignKey(
        'User', on_delete=models.CASCADE, db_column='SellerID')
    StartPrice = models.DecimalField(
        max_digits=10, decimal_places=2, db_column='StartPrice')
    BuyNowPrice = models.DecimalField(
        max_digits=10, decimal_places=2, db_column='BuyNowPrice')
    Description = models.TextField(db_column='Description')
    AuctionStatus = models.CharField(max_length=10, choices=[
        ('Active', 'Active'), ('Inactive', 'Inactive'), ('Canceled', 'Canceled')], db_column='AuctionStatus')
    StartTime = models.DateTimeField(db_column='StartTime')
    EndTime = models.DateTimeField(db_column='EndTime')
    Category = models.CharField(max_length=255, db_column='Category')
    Availability = models.BooleanField(db_column='Availability')
    Condition = models.CharField(max_length=20, choices=[
        ('Unopened', 'Unopened'), ('OpenedButSealed', 'OpenedButSealed'), ('OpenedWithoutSeal', 'OpenedWithoutSeal')],
        db_column='Condition')
    TastingNotes = models.TextField(db_column='TastingNotes')
    Region = models.CharField(max_length=255, db_column='Region')

    class Meta:
        db_table = 'WhiskyDetails'
