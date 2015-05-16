pm2 kill
pm2 start ./test/echo.js
sleep 4
pm2 start ./test/echo.js -f
sleep 4
pm2 start ./test/server.js
sleep 4
pm2 restart server.js
sleep 4
pm2 delete server
sleep 4
pm2 start ./test/stop.js
sleep 5
pm2 kill
pm2 start ./test/echo.js
