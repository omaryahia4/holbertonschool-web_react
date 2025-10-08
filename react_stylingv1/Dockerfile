FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    libssl-dev \
    pkg-config \
    git \
    curl \
    wget \
    gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add Atlassian acli repository and install acli
RUN mkdir -p -m 755 /etc/apt/keyrings \
 && wget -nv -O- https://acli.atlassian.com/gpg/public-key.asc | gpg --dearmor -o /etc/apt/keyrings/acli-archive-keyring.gpg \
 && chmod go+r /etc/apt/keyrings/acli-archive-keyring.gpg \
 && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/acli-archive-keyring.gpg] https://acli.atlassian.com/linux/deb stable main" \
    > /etc/apt/sources.list.d/acli.list \
 && apt-get update \
 && apt-get install -y acli \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*



COPY . .
