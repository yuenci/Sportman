import os
import openai
# pip install openai
import config


def chat(messageList):
    openai.api_key = config.openai_api_key

    start_sequence = "\nAI:"
    restart_sequence = "\nHuman: "

    message = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly."

    # print("🚐")
    # print(messageList)

    i = 1
    for ele in messageList:
        if i % 2 == 0:
            message += restart_sequence + ele
        else:
            message += start_sequence + ele
        i += 1
    #print("💌：" + message)

    response = openai.Completion.create(
        # model="text-curie-001",
        model="text-davinci-002",
        prompt=message,
        temperature=0.9,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        stop=[" Human:", " AI:"]
    )
    response = response["choices"][0]["text"].replace(
        "\nAI:", "").replace("\n", "")

    # print("🤖：" + response)
    return {"response": response}


#print(chat("The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: what weather is malaysia?"))
