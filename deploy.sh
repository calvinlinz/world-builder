docker login -u licalv -p dckr_pat_CHIGoNqOBzNOO0RSrPGSaKCagoo
echo Logging in...
docker build --platform=linux/amd64 -t api -f ./API/Dockerfile ./API
docker tag api licalv/world-builder-api
docker push licalv/world-builder-api
echo Pushing to docker hub...
curl https://api.render.com/deploy/srv-ck0i3fm3ktkc73edlj8g?key=P4KGtUpQ_gw
printf "\nSent deploy request to Render.\n"