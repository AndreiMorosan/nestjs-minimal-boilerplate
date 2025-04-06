<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="NestJS Logo" />
  </a>
  <a href="https://neon.tech/" target="_blank">
    <img src="https://neon.tech/_next/static/svgs/6da928883916f39a4848774319dcaf81.svg" width="120" alt="Neon Database Logo" />
  </a>
</p>

<p align="center"> A simple and elegant NestJS boilerplate for <a href="http://nodejs.org" target="_blank">Node.js</a>, designed to help every beginner understand how NestJS works. </p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This boilerplate was created for everyone who wants to start a NestJS project using a Clean Architecture approach with a Neon (PostgreSQL) database and TypeORM. It provides a well-structured foundation to build scalable server-side applications. The project is up to date with the latest versions of its libraries and is designed with a monolith modules architecture to be understandable for every developer (including beginners). 

## Environment Configuration

Create an <b>.env</b> file in the project root. The environment variables typically include:

```bash
NODE_ENV=development

#== APP
PORT=3000
TRANSPORT_PORT=8080
JWT_EXPIRATION_TIME=3600
JWT_REFRESH_EXPIRATION_TIME=86400
ENABLE_ORM_LOGS=true
ENABLE_DOCUMENTATION=true
API_VERSION=v1.0.0

#== JWT Auth
JWT_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----\nMIIJKAIBAAKCAgEApTE/AvX8imGvywdYY8SAt3oQYNxp8wFGiOlCRKTTlEOmMem3\ngIjW1Lbube9Uuyo5yB5z0VX64xor8ZAZVnRsElvjxWA8mo+oya/Xq7cAxvTWTIb4\nyhhwro0uUD0XwXo0Q6wB/j/Za4gz/j7aTsKbyGwmuScei54rVgivC0cAyb29936j\nYlXgUfIlO07I2pQhuMYUmVa87CeJvnrLlXplltKSpZyqxRljbij96FwENZ0pLAl4\na/l2LCrg4zvEcXPZ4a5VflXhDrB08ULrCAzWKWE14Av27rxBQAEaruGhyg5keSKw\nGUT5OBkbbSMCqVlUxuix+paE0nvF5xuE7EvjdjzF96eu/yj5NJ1LlxY8UfBpB3XB\n9xoCZXEZh1jxtSMs/unNo9+G73ihP/J45tfZIGmd9Cb894slD8p7wl4zrsbqkN5k\nJY7nNvCzXfw+cvQd88FBMZn2h/tTJE6Fz7P2yzw2G5Q1wD0VPC+XiCw8LGkkxzim\n0xYC20XTr7bd05Czvsh3ErjxbwKji5wQ/PinA9d2L0llGgZxJ4wOHUWYMgJZn/vl\nxdlijlbp0CUaGDyF3UI0QmLk8G5hbio1KlH2Y6YN0p1MsI+FruvVI/yOpBfXWCnh\ne1OhgCokBjE84ikfHfAIw31kS+RHtpW3Sm1ddD8wmk/2hbCTdbVvqCjz200CAwEA\nAQKCAgBrkF+JXAdvTCCdwVCq1h9CWXckuyE6HJCDQe/mprUmi85CHf9g8LmClQM4\nDmlL3jj1t+6OVsAg9L+8caouA20Dn1X3Ba0wr26mtZtnsqgM5QxNlG2XmsZ0wnVv\nxfgcAajaj7xUg9rdDDleyip4snuhy9qDIZfgLcPmJ41jeH5o3uY9q/ZTZ7vDYDsi\nHTDoMyCqIkDzf+lQlIY6w9agpKxVwxO+Rv9jjB6UcpiynogXKRjQFfKVzEBIjjsV\ne6t0fI1ZSJ1ewCjl2bysBHjqKwGgvC3Kj7/gwDB0rsNjMISa/zgpMI8eRS1Ke/7B\n19Q51XNAefC6TRx7uiCpVd/9xYR8Q0JQhURmjsXWuR8YKfkUFseCsXg/11QMOpSu\nJhFaO1Or7ovLZGeVxy8p7TkGCB1P5TDDCOsDb8uJom8OZCA4ZvP8I96zMZhPosXm\nheb3m+TLhz8LMHyq+t+5xhfWlnf2x8GyBTKyh1UT98vwiEWLIi8dM4h+yoRkpwxw\n9vMSooed9T96NCBXw1HFrT/w5WmAqodDhJf3DuM540B04exAQ7cKRSmpCiCOGcRZ\nfsU/62pc/t7MqBApEPKTis0AVA5HtGsdB8xmB+QBgYfSvxMpSrNSFjgbBb4+tb8l\naJVxEkncWzLbWsk7YsA0Fj6xE93H6cSIKxi9ommTLd2tqyU6AQKCAQEA0jIsQU1Q\n+DpLHCIXQQGlE1LcE9v93DmV5gvkqhGISzmb3oCCuZdESRAKtLkEnBBxX5fmNBWN\n+vunRbvqk+qCS7MclGwLgGGkrm5vNFJ2iVXyKH3Xlg0+LQv7ScyB1f7e6dktSpTH\n9egTZcOkIhTWspcb95huzCnCPlgVQVd6bVkfH07kVWTYfxhO4cPI/aW0lThb0BmW\nsSB4M0rFI6EwaSd667pioDg474w7iOS9OS1C3ab1apRg3V7RiKSGbeUloVap8liy\nRZfTxHvmSZgzCjhcMTjEqTv1/ykKAJmKwHLbJhTJEdTyPCSYEtDhD92h9c6+0zmG\nOX8tDvC2oylAjQKCAQEAyTCJcyRP4SxM48MjIWWLI2WcaLtD2+r7xpsG3ITSMe+T\ndFtcAkXAt62cx/XIbl8EkcbAhB1dbaluAHS7G6b1XiSu0+eGuGQ70bgqR6epIl8N\nPxlcusjilAkmp+wQOEYL1HpQqlPuxoZeQgkcla1eCpLOycM18kSasb0vGu2a3X0O\nCV8u2/H4n31o3K2Ov69W111CqNiNBcFRItSMatuHo7v3FfoWO9r3RBnVI+/GfJJS\nnRyI7jUgcmfV45Yd0dCZS2cEFKJleCUcNZUJfZu/O4ujjJ3P3LhrM4YYIoLpv9US\n8l3nmPf4oSs5ijz07xO+zgE58wIsc1QglKNGp7E1wQKCAQEAjPuUDVTDa0sGF9+R\nw0tMIlLgQ/25Ht4M+ZiejadmyDXiovGFPOAFsA+vbpnuSpMIx/pFMEgIy//AqRgq\ndX3EWOvQzohNipVzdH+j3O82jFT2MEx/rihBvMsdh9lAeH0TnLvLEgwKtpgrcoUv\ncKCThIOwAXjfT9bubwx7bTE0b2VoZ4Jtygzy3QQ73FeKVv6uyatcgY64MSO7G4Qa\nCBTUOKN/Yd7IyfgL0Dg5sk7h0BjYkXyrfQn6kmBHoCPh+pHIlJdhM6hkIiN8qXwE\n8PXBvighRe5ykaQjEjq/d7mEhCJFdRxZ5Lj0pHxS98PcQN0CBbHe8iPSMHxph2zS\nw0sm/QKCAQBg8j6JeUn0m0BB0FoxUZkGaYRBA1vjsQu53CImSOpwnZ1USGHBxpLi\n74nI4Sq/5JFzHW7POsc2fJpBJf6ziHRb9Rk5iytj1wjsOe5FsQjTQzJC4ZnJd9uW\nsgIqkJoQQ9CXhokwSlmY2E67S2C2z1+tgKicmLB6GYzhcOQt+ajSadxFr9QIsES5\ntdi93fQXcgpKpOnmKtNpnonWWs1/AGIQCBc8Q9JK7WyRKFGIi5X9mRSuGH3zKy6D\ncn2iuUeNPxNfPji9KLP0fQ1m1HZKTK6NpvAcZj8vgL5Hiao/lw3EHoyOtalQEM2B\n/C4x6sWsHrum0Ph3nOiGeldoyHTXgZEBAoIBABot8GcrB88DMPePAObFmZjcjdUo\nhfDTogLVoMmcaFB0JZB2/qe0fVvYwaP0U6w4PETzCJrh30Nu3SnsBIm9Cp+3nAhs\nmMZup3FFrCK908M1s+e9VuCtonLkAggjhcFMzNu9MxSbm73i1E0msfYbDuMSpohy\nuZmdA9wo/HgR2PlP0xjOO9MVNThuRM6a+UdwiasdueYuptss6Tfj5Ralp60Z0vG/\n/AY1j9JEQANRG+vzWpjbtKMoMKYzRIhv8NzWIqjXB71kSjZRi11iNIdx5qaA5OqQ\nX5uJ3syqVUCkDqq+TBjjpeY/53TEOQx2Z36ONZc5OtZ2O6WAe0PErrvpWzk=\n-----END RSA PRIVATE KEY-----
JWT_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApTE/AvX8imGvywdYY8SA\nt3oQYNxp8wFGiOlCRKTTlEOmMem3gIjW1Lbube9Uuyo5yB5z0VX64xor8ZAZVnRs\nElvjxWA8mo+oya/Xq7cAxvTWTIb4yhhwro0uUD0XwXo0Q6wB/j/Za4gz/j7aTsKb\nyGwmuScei54rVgivC0cAyb29936jYlXgUfIlO07I2pQhuMYUmVa87CeJvnrLlXpl\nltKSpZyqxRljbij96FwENZ0pLAl4a/l2LCrg4zvEcXPZ4a5VflXhDrB08ULrCAzW\nKWE14Av27rxBQAEaruGhyg5keSKwGUT5OBkbbSMCqVlUxuix+paE0nvF5xuE7Evj\ndjzF96eu/yj5NJ1LlxY8UfBpB3XB9xoCZXEZh1jxtSMs/unNo9+G73ihP/J45tfZ\nIGmd9Cb894slD8p7wl4zrsbqkN5kJY7nNvCzXfw+cvQd88FBMZn2h/tTJE6Fz7P2\nyzw2G5Q1wD0VPC+XiCw8LGkkxzim0xYC20XTr7bd05Czvsh3ErjxbwKji5wQ/Pin\nA9d2L0llGgZxJ4wOHUWYMgJZn/vlxdlijlbp0CUaGDyF3UI0QmLk8G5hbio1KlH2\nY6YN0p1MsI+FruvVI/yOpBfXWCnhe1OhgCokBjE84ikfHfAIw31kS+RHtpW3Sm1d\ndD8wmk/2hbCTdbVvqCjz200CAwEAAQ==\n-----END PUBLIC KEY-----

#== DB (use Neon for this boilerplate)
DB_TYPE=postgres
DB_DATABASE=nest_boilerplate

#== AWS
AWS_S3_ACCESS_KEY_ID=
AWS_S3_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_REGION=eu-central-1
AWS_S3_API_VERSION=2010-12-01
AWS_S3_BUCKET_NAME=nest-boilerplate-bucket

#== Redis (will be added in the future)
# REDIS_CACHE_ENABLED=true
# REDIS_HOST=localhost
# REDIS_PORT=6379

#== Throttler
THROTTLER_TTL=5m
THROTTLER_LIMIT=100
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ pnpm run start:dev

# watch mode
$ pnpm run watch:dev
```

For both development and production, you can also use the provided Docker Compose files.

The Makefile contains scripts for running and shutting down Docker images.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### API documentation

http://localhost:{port-number}/documentation
![image](https://github.com/user-attachments/assets/ae60f73b-662e-499c-8294-68de689cfa72)

## Deployment

When you're ready to roll out your NestJS application to production, follow these key steps to optimize performance and reliability: (https://docs.nestjs.com/deployment).

If you're interested in a cloud-based solution, consider using [Mau](https://mau.nestjs.com) — the official platform for deploying NestJS applications on AWS. 

Mau simplifies deployment with just a few commands:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Stay in touch

- Author - [Morosan Andrei](https://www.linkedin.com/in/andrei-moro%C8%99an-ab171a179/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
