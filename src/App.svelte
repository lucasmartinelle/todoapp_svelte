<script>
	// @ts-ignore
	import { Router, links, Route, navigate } from "svelte-routing";
	import { 
		Button,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader
	} from "sveltestrap";
    import EditTask from "./components/editTask.svelte";
    import CreateTask from "./components/createTask.svelte";
    import ListTask from "./components/listTask.svelte";

	let tasks = [
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
	];

	tasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));

	/**
	 * delete modal
	 */
	let taskToDelete = null;
	let open = false;
	const toggle = () => (open = !open)

	const showModalDeleteTask = (task) => {
		taskToDelete = task;
		toggle();
	}

	/**
	 * tasks method
	 */
	const changeDone = (index) => {
		const newTasks = [...tasks]; // copie du tableau
		newTasks[index] = { ...newTasks[index], done: !newTasks[index].done };

		// Todo
		tasks = newTasks;
	};

	const editTask = (index, titre, description, dateEcheance, priorite) => {
		const newTasks = [...tasks]; // copie du tableau
		newTasks[index] = {
			titre: titre,
			description: description,
			dateEcheance: dateEcheance, 
			priorite: priorite,
			done: false,
			show: true
		};

		// Todo
		tasks = newTasks;
	};

	const addTask = (titre, description, dateEcheance, priorite) => {
		const task = {
			titre: titre,
			description: description,
			dateEcheance: dateEcheance, 
			priorite: priorite,
			done: false,
			show: true
		};
		const newTasks = [...tasks, task];
		newTasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));
		tasks = newTasks;
	};

	const deleteTask = (task) => {
		toggle();
		let newTasks = [...tasks];
		newTasks = newTasks.filter((cur) => task != cur);
		newTasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));
		tasks = newTasks;
	}

	const filterTask = (titre, dateEcheance, status) => {
		const newTasks = [...tasks];
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

		tasks = newTasks;
	}

	const sortTask = (sortOption) => {
		let newTasks = [...tasks];
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
		tasks = newTasks;
	}
</script>

<main use:links>
	<div class="container-fluid">
		<h1 class="text-white fw-bold ff-poppins">TODO List pour les étudiants</h1>
		<h4 class="text-white fw-bold ff-montserrat">Vous n'oublierez plus jamais vos devoirs</h4>
	</div>
	<Router url="">
		<Route path="/">
			<ListTask 
				tasks={tasks} 
				changeDone={changeDone} 
				showModalDeleteTask={showModalDeleteTask} 
				filterTask={filterTask} 
				sortTask={sortTask} />
		</Route>
		<Route path="/create">
			<CreateTask 
				addTask={addTask} />	
		</Route>
		<Route path="/edit/:index" let:params>
			<EditTask task={tasks[params.index]} index={params.index} editTask={editTask} />
		</Route>
	</Router>
	
	<!-- Delete task -->
	<Modal isOpen={open} {toggle}>
		<ModalHeader {toggle}>Supprimer la tâche <span class="text-danger">{#if taskToDelete != null}{taskToDelete.titre}{/if}</ModalHeader>
		<ModalBody>
			Vous êtes sur le point de supprimer la tâche <span class="text-danger">{#if taskToDelete != null}{taskToDelete.titre}{/if}</span>. Voulez-vous continuer ?
		</ModalBody>
		<ModalFooter>
			<Button color="secondary" on:click={toggle}>Annuler</Button>
			<Button color="danger" on:click={() => deleteTask(taskToDelete)}>Supprimer</Button>
		</ModalFooter>
	</Modal>
</main>

<style>
	.ff-montserrat {
		font-family: 'Montserrat', sans-serif;
	}

	.ff-poppins {
		font-family: 'Poppins', sans-serif;
	}
</style>