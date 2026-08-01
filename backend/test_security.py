from app.core.security import hash_password, verify_password

password = "Hari@123"

hashed = hash_password(password)

print("Original Password :", password)
print("Hashed Password   :", hashed)

print("\nVerification Result:")

print(
    verify_password(
        password,
        hashed
    )
)