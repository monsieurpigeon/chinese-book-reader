import jieba
import jieba.posseg as pseg
import collections
import csv

file1 = open("book.txt")

# Reading from file
txt = file1.read()
with open("app/src/assets/book.txt", "w") as f:
    f.write("/".join(jieba.cut(txt, HMM=False)))

charsToRemove = "#1234567890（）…：，。\”“‘！？\n、《》"
for char in charsToRemove:
    txt = txt.replace(char, "")

words = pseg.cut(txt)

elements_count = collections.Counter(words)
# print(len(elements_count), elements_count)
# print("The Array is: ", elements_count)


with open("app/src/assets/list.csv", "w", newline="") as csvfile:
    fieldnames = ["hanzi", "frequency"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for (key, whatever), value in elements_count.most_common():
        writer.writerow({"hanzi": key, "frequency": value})
