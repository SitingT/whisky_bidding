from rest_framework.permissions import BasePermission, SAFE_METHODS


class PostOnlyAuthenticated(BasePermission):
    """
    The request is authenticated as a user for POST requests, or is a GET request.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated


class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)
