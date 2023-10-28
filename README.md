# Booking API - Ultra Basic Edition

You can use this API for small projects, maybe for something like setting schedules on a small server or something, idk. Get creative.

Its based on a college project I did with a team on a Databases course written in Python. I'm using Javascript for this one since for some reason Python APIs are kind of slow (and want to make a better DB arquitecture lol)

I wanted to make the booking system general so it ccould be 

## Supported Operations

- [ x ] Register a new User
- [ ] Find available Rooms (Labs, classrooms, Study Space, )
- [ ] Give an all-day schedule for a room
- [ ] Create a meeting with 2+ people in a room
- [ ] Find a time that is free for everyone in the meeting
- Allow the user to mark a time-slot as "Unavailable" or "Available". By default all users are available unless specified
- [ ] Users can invite other users, as long as it does not surpass the room capacity

### CRUD Operations for:

- [ ] Meeting
- [ ] Invitee
- [ ] User
- [ ] Room

### Statistics

#### User Level

- [ ] Most Used Room
- [ ] User who got booked or booked most with another user

#### Global Statistics

- [ ] Find busiest hours (top 10)
- [ ] Find user who booked most (top 10) [these users are the most busy]
- [ ] Find most booked rooms [these rooms are the most popular]


This API is available on RapidAPI. There's a free tier where you can perform up to 20k free requests per month. Afterwards each request will cost 0.5 US cents