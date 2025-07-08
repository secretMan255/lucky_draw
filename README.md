node version - v23.8.0
copy db.sql and sp.sql to db and execute.
copy luckDraw.postman_collection.json to postman.

# This endpoint will select the winner
```
/lucky-draw/get/winner?gift_id=2&user_id=1
```

# How it work
1. FOR UPDATE will lock the row so other calls must wait
2. If the winner_id is null, assign the winner. Other calls see the winner_id is not null, so do nothing

# ENV
```
TIME_ZONE=Asia/Kuala_Lumpur
CRON_TIME=*/5 * * * * *
ALLOWED_ORIGINS=*
PORT=8080
HOST=0.0.0.0
SECRET_KEY=
DATABASE_URL=mysql://root:%23EDC3edc@127.0.0.1:3306/luckyDraw
```

# Initialize Service
``` 
npm i
```

# Run Service
```
npm run dev
```

