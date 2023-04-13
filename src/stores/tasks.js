import { writable } from 'svelte/store';
import { navigate } from "svelte-routing";

export const tasksStore = writable([
    {
        titre: "Tâche test numéro 1",
        description: "Cette tâche est la tâche test numéro 1",
        dateEcheance: "2023-04-28", 
        priorite: '0',
        done: false,
        show: true
    },
    {
        titre: "Tâche test numéro 2",
        description: "Cette tâche est la tâche test numéro 2",
        dateEcheance: "2023-04-24", 
        priorite: '3',
        done: false,
        show: true
    },
    {
        titre: "Tâche test numéro 3",
        description: "Cette tâche est la tâche test numéro 3",
        dateEcheance: "2023-04-20", 
        priorite: '1',
        done: false,
        show: true
    }
]);

export function sortByPriorite() {
    tasksStore.update((tasksData) => tasksData.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0)));
}

export function changeDone(index) {
    let tasksData = [];
    tasksStore.subscribe((value) => {
        tasksData = value;
    });
    const newTasks = [...tasksData]; // copie du tableau
    newTasks[index] = { ...newTasks[index], done: !newTasks[index].done };

    // Todo
    tasksStore.set(newTasks);
}

export function editTask(index, titre, description, dateEcheance, priorite) {
    let tasksData = [];
    tasksStore.subscribe((value) => {
        tasksData = value;
    });

    const newTasks = [...tasksData];
    newTasks[index] = {
        titre: titre,
        description: description,
        dateEcheance: dateEcheance, 
        priorite: priorite,
        done: false,
        show: true
    };

    tasksStore.set(newTasks);

    navigate("/", { replace: true });
}

export function addTask(titre, description, dateEcheance, priorite) {
    const task = {
        titre: titre,
        description: description,
        dateEcheance: dateEcheance, 
        priorite: priorite,
        done: false,
        show: true
    };

    let tasksData = [];
    tasksStore.subscribe((value) => {
        tasksData = value;
    });

    const newTasks = [...tasksData, task];
    newTasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));
    tasksStore.set(newTasks);

    navigate("/", { replace: true });
}

export function deleteTask(task) {
    let tasksData = [];
    tasksStore.subscribe((value) => {
        tasksData = value;
    });

    let newTasks = [...tasksData];
    newTasks = newTasks.filter((cur) => task != cur);
    newTasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));
    tasksStore.set(newTasks);
}

export function filterTask(titre, dateEcheance, status) {
    let tasksData = [];
    tasksStore.subscribe((value) => {
        tasksData = value;
    });

    const newTasks = [...tasksData];
    newTasks.forEach((task) => task.show = true);
    if(titre != undefined && titre != ""){
        newTasks.forEach((task) => {
            if(task.titre.indexOf(titre) == -1){
                task.show = false;
            }
        });
    }

    if(dateEcheance != undefined && dateEcheance != ""){
        console.log(dateEcheance);
        newTasks.forEach((task) => {
            if(task.dateEcheance != dateEcheance){
                task.show = false;
            }
        });
    }

    if(status != undefined && status != "" && status != "*"){
        newTasks.forEach((task) => {
            if(status == "a_faire" && task.done == true){
                task.show = false;
            } else if(status == "fait" && task.done == false){
                task.show = false;
            }
        });
    }

    tasksStore.set(newTasks);
}

export function sortTask(sortOption) {
    let tasksData = [];
    tasksStore.subscribe((value) => {
        tasksData = value;
    });

    let newTasks = [...tasksData];
    switch(sortOption){
        case "urgence":
            newTasks.sort((a, b) => (a.dateEcheance < b.dateEcheance) ? 1 : ((a.dateEcheance > b.dateEcheance) ? -1 : 0));
            break;
        case "status":
            newTasks.sort((a, b) => (a.done == true && b.done == false) ? 1 : ((a.done == false && b.done == true) ? -1 : 0));
            break;
        default:
            newTasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));
            break;
    }
    tasksStore.set(newTasks);
}

export function cleanTask() {
    tasksStore.set([]);
}