const dbData = [
    {
        id: crypto.randomUUID(),
        title: "sugar",
        category: "grocery",
        amount: "300.45",
    },
    {
        id: crypto.randomUUID(),
        title: "oil",
        category: "grocery",
        amount: "1800",
    },
    {
        id: crypto.randomUUID(),
        title: "college fees",
        category: "education",
        amount: "60000",
    },
    {
        id: crypto.randomUUID(),
        title: "utility bills",
        category: "bills",
        amount: "4500",
    }
];

const categoryData =[{value:"grocery",text:"Grocery"},{value:"bills",text:"Bills"},{value:"education",text:"Education"}]

export { dbData, categoryData };