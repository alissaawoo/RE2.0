import json
import requests


r = requests.get("https://api.songkick.com/api/3.0/metro_areas/26330/calendar.json?apikey=lEvytpwl4q8UYTJf")
print(r.json())
