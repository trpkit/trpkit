FROM rust:latest AS builder
COPY . .
RUN cargo build --release --locked

FROM gcr.io/distroless/cc
COPY --from=builder /target/release/trpk-it /
CMD ["./trpk-it"]