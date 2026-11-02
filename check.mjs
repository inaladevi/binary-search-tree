import Tree from "./Tree.js";
const inOrder = (t) => { const out = []; t.inOrderForEach((v) => out.push(v)); return out; };
let ok = true;
const check = (name, cond) => { console.log((cond ? "PASS " : "FAIL ") + name); if (!cond) ok = false; };

const a = new Tree([5]); a.deleteItem(5);
check("delete only node -> empty tree", a.root === null);

const b = new Tree([1, 2]); const rootVal = b.root.data; b.deleteItem(rootVal);
check("delete root with one child -> value gone", !b.includes(rootVal) && inOrder(b).length === 1);

const c = new Tree([1, 2, 3, 4, 5, 6, 7]); c.deleteItem(4);
check("delete root with two children keeps order", JSON.stringify(inOrder(c)) === "[1,2,3,5,6,7]");

const d = new Tree([1, 2, 3, 4, 5, 6, 7]); d.deleteItem(1); d.deleteItem(7); d.deleteItem(99);
check("delete leaves and missing value", JSON.stringify(inOrder(d)) === "[2,3,4,5,6]");
console.log(ok ? "ALL PASS" : "SOME FAILED");