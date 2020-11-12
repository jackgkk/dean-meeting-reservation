FROM alpine:latest

RUN apk add openssh \
     && echo "root:Docker!" | chpasswd

EXPOSE 80 2222

ENTRYPOINT ["/usr/sbin/sshd"]