FROM nginx:latest

RUN apt update && apt install -y nginx-extras

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
