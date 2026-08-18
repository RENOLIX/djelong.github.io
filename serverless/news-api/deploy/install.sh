#!/usr/bin/env bash
set -euo pipefail

dnf install -y nodejs npm nginx

id djelong >/dev/null 2>&1 || useradd --system --home /opt/djelong-news-api --shell /sbin/nologin djelong
install -d -o djelong -g djelong -m 0750 /opt/djelong-news-api
install -m 0644 djelong-news-api.service /etc/systemd/system/djelong-news-api.service
install -m 0644 nginx-djelong-news-api.conf /etc/nginx/conf.d/djelong-news-api.conf

systemctl daemon-reload
systemctl enable djelong-news-api nginx
