import requests

response = requests.get("http://localhost:3000/getExampleData?userCount=3&biasArray={%22bias%22:1.25,%22timeAccelerator%22:12}-{%22bias%22:0.75,%22timeAccelerator%22:18}")
exampleData = response.content.decode()

print(exampleData)