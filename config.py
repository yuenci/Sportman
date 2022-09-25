import os

openai_api_key = "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"
default_setting = {
    "appearance": "auto",
    "language": "en",
    "zen": False,
    "cache": False,
    "cache_dir": os.getcwd()+"\cache",
}
cache_dir = r'C:\Users\Innis\Documents\sportman'

print(default_setting["cache_dir"])
