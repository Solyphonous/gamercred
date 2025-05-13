FROM ubuntu AS builder

RUN apt-get update && apt-get upgrade
RUN apt-get install curl unzip -y

RUN curl -fsSL 'https://bun.sh/install' | bash
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

COPY package.json bun.lock ./
RUN bun i

COPY . .

RUN bun --bun run build

FROM ubuntu

RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser

WORKDIR /app
COPY --from=builder /root/.bun/bin/bun /usr/local/bin/bun
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "./build/index.js"]
