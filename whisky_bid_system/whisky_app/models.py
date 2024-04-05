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

# class Bid(models.Model):
#     item = models.ForeignKey(WhiskyDetails, on_delete=models.CASCADE)
#     bidder = models.ForeignKey(
#         User, related_name='bids', on_delete=models.CASCADE)
#     bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     bid_time = models.DateTimeField()

#     class Meta:
#         db_table = 'Bids'

# # Transaction Model


# PaymentMethod Model


# class PaymentMethod(models.Model):
#     method_name = models.CharField(max_length=255)
#     method_type = models.CharField(
#         max_length=7, choices=[('Online', 'Online'), ('Offline', 'Offline')])
#     description = models.TextField()
#     status = models.BooleanField()

#     class Meta:
#         db_table = 'PaymentMethods'

# # WhiskyDetails Model


# # Bid Model


# class Transaction(models.Model):
#     item = models.ForeignKey(WhiskyDetails, on_delete=models.CASCADE)
#     buyer = models.ForeignKey(
#         User, related_name='transactions_as_buyer', on_delete=models.CASCADE)
#     seller = models.ForeignKey(
#         User, related_name='transactions_as_seller', on_delete=models.CASCADE)
#     final_price = models.DecimalField(max_digits=10, decimal_places=2)
#     transaction_status = models.CharField(max_length=10, choices=[(
#         'Initiated', 'Initiated'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')])
#     payment_status = models.CharField(max_length=9, choices=[(
#         'Pending', 'Pending'), ('Completed', 'Completed'), ('Failed', 'Failed')])

#     payment_method = models.ForeignKey(
#         PaymentMethod, on_delete=models.SET_NULL, null=True)
#     ups_tracking_number = models.CharField(max_length=255)
#     transaction_date = models.DateTimeField()

#     class Meta:
#         db_table = 'Transactions'

# # Review Model


# class Review(models.Model):
#     reviewer = models.ForeignKey(
#         User, related_name='given_reviews', on_delete=models.CASCADE)
#     reviewee = models.ForeignKey(
#         User, related_name='received_reviews', on_delete=models.CASCADE)
#     item = models.ForeignKey(WhiskyDetails, on_delete=models.CASCADE)
#     rating = models.DecimalField(max_digits=3, decimal_places=2)
#     comment = models.TextField()
#     comment_time = models.DateTimeField()
#     is_deleted = models.BooleanField(default=False)

#     class Meta:
#         db_table = 'Reviews'

# # Message Model


# class Message(models.Model):
#     sender = models.ForeignKey(
#         User, related_name='sent_messages', on_delete=models.CASCADE)
#     receiver = models.ForeignKey(
#         User, related_name='received_messages', on_delete=models.CASCADE)
#     content = models.TextField()
#     send_time = models.DateTimeField()
#     is_sensitive = models.BooleanField()
#     related_item = models.ForeignKey(
#         WhiskyDetails, on_delete=models.CASCADE, null=True, blank=True)

#     class Meta:
#         db_table = 'Messages'

# # ForumPost Model


# class ForumPost(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     content = models.TextField()
#     post_time = models.DateTimeField()
#     is_deleted = models.BooleanField(default=False)

#     class Meta:
#         db_table = 'ForumPosts'

# # Report Model


# class Report(models.Model):
#     creator = models.ForeignKey(
#         User, related_name='created_reports', on_delete=models.CASCADE)
#     reported_user = models.ForeignKey(
#         User, related_name='received_reports', on_delete=models.CASCADE)
#     report_type = models.CharField(max_length=255)
#     content = models.TextField()
#     creation_time = models.DateTimeField()

#     class Meta:
#         db_table = 'Reports'

# # Recommendation Model


# class Recommendation(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     recommended_item = models.ForeignKey(
#         WhiskyDetails, on_delete=models.CASCADE)
#     created_datetime = models.DateTimeField()

#     class Meta:
#         db_table = 'Recommendations'

# # OfflinePayment Model


# class OfflinePayment(models.Model):
#     transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
#     method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
#     details = models.CharField(max_length=255)
#     received_date = models.DateTimeField()

#     class Meta:
#         db_table = 'OfflinePayments'
