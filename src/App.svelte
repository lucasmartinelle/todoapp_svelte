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
			dateEcheance: "28-04-2023", 
			priorite: '0',
			done: false,
		},
		{
			titre: "Tâche test numéro 2",
			description: "Cette tâche est la tâche test numéro 2",
			dateEcheance: "28-04-2023", 
			priorite: '3',
			done: false,
		},
		{
			titre: "Tâche test numéro 3",
			description: "Cette tâche est la tâche test numéro 3",
			dateEcheance: "28-04-2023", 
			priorite: '1',
			done: false,
		}
	];

	tasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));

	let taskToDelete = null;

	let open = false;
	const toggle = () => (open = !open)

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
		};

		// Todo
		tasks = newTasks;
		navigate("/");
	};

	const addTask = (titre, description, dateEcheance, priorite) => {
		const task = {
			titre: titre,
			description: description,
			dateEcheance: dateEcheance, 
			priorite: priorite,
			done: false,
		};
		tasks = [...tasks, task];
		tasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));
		navigate("/");
	};

	const deleteTask = (task) => {
		toggle();
		tasks = tasks.filter((cur) => task != cur);
		tasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));
	}

	const showModalDeleteTask = (task) => {
		taskToDelete = task;
		toggle();
	}
</script>

<main use:links>
	<div class="container-fluid">
		<h1 class="text-white fw-bold ff-poppins">TODO List pour les étudiants</h1>
		<h4 class="text-white fw-bold ff-montserrat">Vous n'oublierez plus jamais vos devoirs</h4>
	</div>
	<Router url="">
		<Route path="/">
			<ListTask tasks={tasks} changeDone={changeDone} showModalDeleteTask={showModalDeleteTask} />
		</Route>
		<Route path="/create">
			<CreateTask addTask={addTask} />	
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