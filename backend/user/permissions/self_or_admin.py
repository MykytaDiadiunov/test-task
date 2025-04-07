from rest_framework import permissions


class IsSelfOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            if request.user.is_staff:
                return True

            return obj == request.user
        return False
