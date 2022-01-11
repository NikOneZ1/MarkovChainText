import numpy as np


def generate_text(init_text, words_number):
    split_text = init_text.split()
    def create_pairs(text):
        for i in range(len(text) - 1):
            yield text[i], text[i + 1]

    pairs = create_pairs(split_text)

    word_dict = {}

    for word_1, word_2 in pairs:
        if word_1 in word_dict.keys():
            word_dict[word_1].append(word_2)
        else:
            word_dict[word_1] = [word_2]

    first_word = np.random.choice(split_text)

    k = 0
    while first_word.islower() and k < len(split_text):
        first_word = np.random.choice(split_text)
        k += 1

    chain = [first_word]

    for i in range(int(words_number)):
        next_words = word_dict.get(chain[-1], "")
        while not next_words:
            next_words = word_dict.get(np.random.choice(split_text), "")
        chain.append(np.random.choice(next_words))

    return ' '.join(chain)
