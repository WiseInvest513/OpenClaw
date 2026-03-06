import { translate } from '@vitalets/google-translate-api';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const skillsPath = path.join(process.cwd(), 'src', 'data', 'skills.ts');
    let content = fs.readFileSync(skillsPath, 'utf-8');
    
    // Find the skillsData array specifically
    const arrayStartStr = 'export const skillsData = ';
    const startIndex = content.indexOf(arrayStartStr) + arrayStartStr.length;
    const endIndex = content.lastIndexOf(']') + 1;
    
    const jsonStr = content.substring(startIndex, endIndex);
    
    let skills;
    try {
        skills = JSON.parse(jsonStr);
    } catch(e) {
        console.error("Parse error snippet:", jsonStr.substring(0, 100));
        throw e;
    }
    
    console.log(`Starting translation of ${skills.length} skills...`);
    
    // Process in smaller chunks to be safe with Google Translate API
    const chunkSize = 50;
    for (let i = 0; i < skills.length; i += chunkSize) {
        const chunk = skills.slice(i, i + chunkSize);
        console.log(`\n--- Processing chunk ${Math.floor(i/chunkSize) + 1}/${Math.ceil(skills.length/chunkSize)} ---`);
        
        await Promise.all(chunk.map(async (skill, idx) => {
            const globalIdx = i + idx;
            // Skip if already containing chinese characters (heuristic)
            if (/[\u4e00-\u9fa5]/.test(skill.desc)) {
                return;
            }
            
            try {
                const res = await translate(skill.desc, { to: 'zh-CN' });
                skill.desc = res.text;
                console.log(`[${globalIdx+1}/${skills.length}] Translated: ${skill.name}`);
            } catch (e) {
                console.error(`Failed to translate ${skill.name}:`, e.message);
                // Simple retry
                try {
                    await new Promise(r => setTimeout(r, 1000));
                    const res = await translate(skill.desc, { to: 'zh-CN' });
                    skill.desc = res.text;
                    console.log(`[${globalIdx+1}/${skills.length}] Translated (retry): ${skill.name}`);
                } catch (e2) {
                    console.error(`Failed retry for ${skill.name}:`, e2.message);
                }
            }
        }));
        
        // Wait between chunks
        if (i + chunkSize < skills.length) {
            console.log("Waiting 3 seconds before next chunk...");
            await new Promise(r => setTimeout(r, 3000));
        }
    }
    
    const newContent = content.substring(0, startIndex) + JSON.stringify(skills, null, 2) + content.substring(endIndex);
    fs.writeFileSync(skillsPath, newContent, 'utf-8');
    console.log('Translation complete!');
}

main().catch(console.error);
