import translate from 'translatte';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const skillsPath = path.join(process.cwd(), 'src', 'data', 'skills.ts');
    let content = fs.readFileSync(skillsPath, 'utf-8');
    
    const arrayStartStr = 'export const skillsData = ';
    const startIndex = content.indexOf(arrayStartStr) + arrayStartStr.length;
    const endIndex = content.lastIndexOf(']') + 1;
    
    const jsonStr = content.substring(startIndex, endIndex);
    let skills = JSON.parse(jsonStr);
    
    console.log(`Starting translation of ${skills.length} skills...`);
    
    let translatedCount = 0;
    
    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        
        // Skip if already contains chinese
        if (/[\u4e00-\u9fa5]/.test(skill.desc)) {
            continue;
        }
        
        try {
            const res = await translate(skill.desc, { to: 'zh-CN' });
            skill.desc = res.text;
            translatedCount++;
            console.log(`[${i+1}/${skills.length}] Translated: ${skill.name}`);
            
            // Random delay to avoid rate limit
            await new Promise(r => setTimeout(r, Math.floor(Math.random() * 800) + 200));
        } catch (e) {
            console.error(`Failed to translate ${skill.name}`);
            try {
                await new Promise(r => setTimeout(r, 2000));
                const res = await translate(skill.desc, { to: 'zh-CN' });
                skill.desc = res.text;
                translatedCount++;
            } catch(e2) {
                // If it still fails, just keep the english
            }
        }
        
        // Save progress every 20 items so we don't lose data
        if (translatedCount > 0 && translatedCount % 20 === 0) {
            const newContent = content.substring(0, startIndex) + JSON.stringify(skills, null, 2) + content.substring(endIndex);
            fs.writeFileSync(skillsPath, newContent, 'utf-8');
            console.log("--- Progress saved! ---");
        }
    }
    
    const newContent = content.substring(0, startIndex) + JSON.stringify(skills, null, 2) + content.substring(endIndex);
    fs.writeFileSync(skillsPath, newContent, 'utf-8');
    console.log(`Translation complete! Translated ${translatedCount} items.`);
}

main().catch(console.error);