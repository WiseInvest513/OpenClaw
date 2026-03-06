import urllib.request
import urllib.parse
import json
import re

def translate(text):
    # Skip if contains chinese
    if re.search(r'[\u4e00-\u9fa5]', text):
        return text
        
    try:
        url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=" + urllib.parse.quote(text)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode('utf-8'))
        return "".join([x[0] for x in result[0]])
    except Exception as e:
        print("Translation error:", e)
        return text

def main():
    path = "src/data/skills.ts"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    array_start_str = 'export const skillsData = '
    start_idx = content.find(array_start_str) + len(array_start_str)
    end_idx = content.rfind(']') + 1
    
    json_str = content[start_idx:end_idx]
    skills = json.loads(json_str)

    print(f"Translating {len(skills)} skills...")
    
    for i, skill in enumerate(skills):
        skill['desc'] = translate(skill['desc'])
        if (i+1) % 50 == 0:
            print(f"Translated {i+1} / {len(skills)}")
            
    new_content = content[:start_idx] + json.dumps(skills, ensure_ascii=False, indent=2) + content[end_idx:]
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("Done!")

if __name__ == "__main__":
    main()