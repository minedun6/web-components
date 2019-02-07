**Step-by-step walkthrough**
---
1. Pick up an issue: https://github.com/pearson-ux/web-components/issues  
2. Clone the web-components repo: https://github.com/pearson-ux/web-components  
3. Create a folder and label it the component name (e.g. tooltip)  
4. Inside your component folder, create a folder and label it “markup-kit”  
5. Create a branch ‘markup/component-name’ (e.g. markup/tooltip)  
6. Now head over to Web component markup kit - https://github.com/pearson-ux/web-component-markup-kit  
7. Download the markup-kit as ZIP file (```-**_DO NOT CLONE markup-kit_**```)  
8. Don’t worry about creating a separate branch for this repo (web-component-markup-kit), just npm install...  
9. You should create that directory `working-dir/component/markup-kit` first, then unzip this file inside. Run these commands:  
        &nbsp;&nbsp;&nbsp;&nbsp;a. `npm install`  
        &nbsp;&nbsp;&nbsp;&nbsp;b. `npm start`  
        &nbsp;&nbsp;&nbsp;&nbsp;c. Other commands to get you started (i.e. compile scss, run babel, watch for changes):  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    i. `gulp styles`  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    ii. `gulp babel`  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   iii. `gulp watch`          
10. Once you complete making your component, copy all of your files from the markup-kit and paste it in the web-components/component-name/markup-kit (e.g. web-components/tooltip/markup-kit)   
11. Go back to you web-components repo, and make sure you are in your branch.   
12. Add and commit your work. The commit message should be in the present tense, here are some guidelines: https://github.com/pearson-ux/web-components/wiki/Committing,-Branching,-and-Merging   
13. Go to github and create a pull request. Add “pearson-ux/prototyping” team to reviewers, and wait for review.   
14. Tktktk Web Component spec kit process: https://github.com/pearson-ux/web-component-spec-kit   

Other references:
https://www.webcomponents.org/introduction