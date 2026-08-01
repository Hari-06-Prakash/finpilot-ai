from app.core.jwt import create_access_token, verify_access_token

payload = {
    "sub": "hari@gmail.com",
    "user_id": 1
}

token = create_access_token(payload)

print("Generated Token:\n")
print(token)

decoded = verify_access_token(token)

print("\nDecoded Payload:\n")
print(decoded)