import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "https://paper-pal-ai-psi.vercel.app/",
        "X-Title": "PaperPal AI"
    }
)


def generate_summary(text: str):

    prompt = f"""
You are PaperPal AI, an assistant that helps users understand academic research papers.

If the uploaded document is not an academic research paper,
inform the user politely.

Otherwise provide:

1. Executive Summary
2. Key Findings
3. Methodology
4. Limitations

Keep the language simple and concise.

Paper:

{text}
"""

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat-v3-0324",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def ask_question(text: str, question: str):

    prompt = f"""
You are PaperPal AI.

Answer the user's question using ONLY the uploaded paper.

If the answer cannot be found in the paper,
say so clearly.

Paper:

{text}

Question:

{question}
"""

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat-v3-0324",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def generate_quiz(text: str):

    prompt = f"""
You are PaperPal AI.

Generate exactly 5 multiple-choice questions based only on the uploaded paper.

For each question provide:

Question
A)
B)
C)
D)

Correct Answer:

Paper:

{text}
"""

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat-v3-0324",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def generate_notes(text: str):

    prompt = f"""
You are PaperPal AI.

Generate concise revision notes from the uploaded research paper.

Format:

# Title

## Key Concepts

• ...

## Important Findings

• ...

## Important Terms

• Term - Meaning

## Quick Revision

• ...

Paper:

{text}
"""

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat-v3-0324",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content