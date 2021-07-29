from cryptography.fernet import Fernet

key = b'aQKbfHRvFtvN3QJwPWywwmcQ-0h_JwoOo3k-MjVUecw='

def encrypt_password(password):
    password = password.encode('utf-8')
    return f.encrypt(password)

def decrypt_password(enc_password):
    decrypted_password = f.decrypt(enc_password)
    return decrypted_password
