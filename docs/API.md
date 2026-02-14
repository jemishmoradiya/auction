# API Routes Documentation

## Base URL
All API routes are available at `/api/*` relative to your Next.js application.

## Authentication
All protected endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

The API client (`@/lib/api-client`) automatically handles this for you.

## Endpoints

### Health Check
**`GET /api/health`** - Public endpoint to check API status

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-14T12:00:00.000Z",
  "environment": "development"
}
```

---

### Profile Management

**`GET /api/profile`** - Get current user profile (Auth required)

Response:
```json
{
  "data": {
    "id": "...",
    "name": "Player Name",
    "bio": "Bio text",
    "gamer_tag": "gamer_name",
    "created_at": "...",
    "updated_at": "..."
  }
}
```

**`PUT /api/profile`** - Update user profile (Auth required)

Request body:
```json
{
  "name": "New Name",
  "bio": "New bio",
  "gamerTag": "new_tag"
}
```

Response:
```json
{
  "success": true
}
```

---

### Game Profiles

**`GET /api/profile/games`** - List user's game profiles (Auth required)

Response:
```json
{
  "data": [
    {
      "game_name": "Valorant",
      "ign": "PlayerName#NA1",
      "rank": "Radiant",
      "role": "Duelist",
      "stats": {},
      "playstyle": ["Aggressive", "Entry"],
      "playing_since": "2020-06-02"
    }
  ]
}
```

**`POST /api/profile/games`** - Create or update game profile (Auth required)

Request body:
```json
{
  "gameName": "Valorant",
  "ign": "PlayerName#NA1",
  "rank": "Radiant",
  "role": "Duelist",
  "stats": { "win_rate": 65 },
  "playstyle": ["Aggressive", "Entry"],
  "playingSince": "2020-06-02"
}
```

Response:
```json
{
  "success": true
}
```

**`DELETE /api/profile/games?id=<profile_id>`** - Delete specific game profile (Auth required)

Query params:
- `id` (required) - ID of the specific game profile to delete

Response:
```json
{
  "success": true
}
```

> **Note**: Users can have multiple profiles for the same game (e.g., main account, smurf account). Deletion is by unique profile ID, not by game name.

---

## Usage Example

```typescript
import { api } from '@/lib/api-client';

// Get profile
const profile = await api.get('/api/profile');

// Update profile
await api.put('/api/profile', {
  name: 'New Name',
  bio: 'New bio'
});

// Get game profiles
const games = await api.get('/api/profile/games');

// Add/update game profile
await api.post('/api/profile/games', {
  gameName: 'Valorant',
  ign: 'PlayerName#NA1',
  rank: 'Radiant'
});

// Delete game profile by ID
await api.delete('/api/profile/games?id=<profile-uuid>');
```

## Error Handling

All errors return JSON with an `error` field:

```json
{
  "error": "Error message here"
}
```

HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `409` - Conflict (duplicate resource)
- `500` - Internal server error
