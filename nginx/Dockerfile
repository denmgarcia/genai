FROM nginx:alpine

RUN apk update && apk add --no-cache \
    nginx \
    nginx-mod-http-lua \
    nginx-mod-http-headers-more \
    nginx-mod-http-geoip \
    nginx-mod-http-image-filter \
    nginx-mod-http-xslt-filter


COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

