import os
import openai

openai.api_key = "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"

start_sequence = "\nAI:"
restart_sequence = "\nHuman: "

response = openai.Completion.create(
    model="text-davinci-002",
    prompt="The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman:I am happy today.",
    temperature=0.9,
    max_tokens=150,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0.6,
    stop=[" Human:", " AI:"]
)
print(response)
