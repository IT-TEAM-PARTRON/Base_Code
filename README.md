# BASE_CODE

## Authentication

Backend requires an access-token secret:

```env
JWT_ACCESS_SECRET=<long-random-secret>
JWT_ACCESS_TTL=1d
```

HTTP status behavior:

- `401`: access token is missing, invalid, or expired; the frontend clears the session and redirects to login.
- `403`: the user is authenticated but does not have the required permission; the frontend displays the 403 page.

Logout calls `POST /api/auth/logout`, then always clears the local frontend session.
