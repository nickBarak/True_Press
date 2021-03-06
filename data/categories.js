const original = [{"title":"Artsweek","maxHeight":"11rem","subcategories":["Feature","Film and TV","Literature","Music","Performing Art","Previews: What's Going On","Visual Art"]},{"title":"Labyrinth","link":"/categories/labyrinth"},{"title":"Multimedia","maxHeight":"5rem","subcategories":["Comics","Photo","Video"]},{"title":"News","maxHeight":"12rem","subcategories":["Campus","County","Crime","Feature","Isla Vista","Student Gov","UC News","UCSB COLA Movement"]},{"title":"Nexustentialism","link":"/categories/nexustentialism"},{"title":"On the Menu","maxHeight":"9rem","subcategories":["Coffee Column","First Bites","Meal Prep Mondays","On the Road","Recipes","The Beet"]},{"title":"Opinion","maxHeight":"17rem","subcategories":["Argument in the Office","Ask AJ","Flesh Prison","Global Gauchos","Hyphenated American","Letters to the Editor","Living","Politics","Therapeutic Thoughts","Virtual Reality","Wednesday Hump"]},{"title":"Science & Tech","maxHeight":"3rem","subcategories":["Health & Wellness"]},{"title":"Sports","maxHeight":"18rem","subcategories":["Baseball","Basketball","Columns/Features","Cross Country","Golf","Soccer","Softball","Swim and Dive","Tennis","Track and Field","Volleyball","Water Polo"]}];

const modified = [{"title":"Arts","maxHeight":"11rem","subcategories":["Arts Subcat 1","Arts Subcat 2","Arts Subcat 3","Arts Subcat 4","Arts Subcat 5","Arts Subcat 6","Arts Subcat 7"]},{"title":"Education","link":"/categories/education"},{"title":"Life","maxHeight":"12rem","subcategories":["Life Subcat 1","Life Subcat 2","Life Subcat 3","Life Subcat 4","Life Subcat 5","Life Subcat 6","Life Subcat 7","Life Subcat 8"]},{"title":"Multimedia","maxHeight":"5rem","subcategories":["Multimedia Subcat 1","Multimedia Subcat 2","Multimedia Subcat 3"]},{"title":"Opinion","maxHeight":"17rem","subcategories":["Opinion Subcat 1","Opinion Subcat 2","Opinion Subcat 3","Opinion Subcat 4","Opinion Subcat 5","Opinion Subcat 6","Opinion Subcat 7","Opinion Subcat 8","Opinion Subcat 9","Opinion Subcat 10","Opinion Subcat 11"]},{"title":"Politics","link":"/categories/politics"},{"title":"Science","maxHeight":"9rem","subcategories":["Science Subcat 1","Science Subcat 2","Science Subcat 3","Science Subcat 4","Science Subcat 5","Science Subcat 6"]},{"title":"Sports","maxHeight":"18rem","subcategories":["Sports Subcat 1","Sports Subcat 2","Sports Subcat 3","Sports Subcat 4","Sports Subcat 5","Sports Subcat 6","Sports Subcat 7","Sports Subcat 8","Sports Subcat 9","Sports Subcat 10","Sports Subcat 11", "Sports Subcat 12"]},{"title":"World","maxHeight":"3rem","subcategories":["World Subcat 1"]}];

const mapOfModifiedToOriginal = {
    Arts: 'Artsweek',
    Education: 'Labyrinth',
    Life: 'News',
    Multimedia: 'Multimedia',
    Opinion: 'Opinion',
    Politics: 'Nexustentialism',
    Science: 'On the Menu',
    Sports: 'Sports',
    World: 'Science & Tech'
}

export function convertSubcategory(category, subcategory) {
    return original
        .find(({ title }) => title === mapOfModifiedToOriginal[category])
        .subcategories[Number(/ (\d)*$/.exec(subcategory)[0])-1];
}

export default modified