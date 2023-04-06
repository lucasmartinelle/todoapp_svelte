<script>
	import svelteLogo from "./assets/svelte.svg";
    import CreateTask from "./components/createTask.svelte";
    import ListTask from "./components/listTask.svelte";
	import viteLogo from "/vite.svg";

	let tasks = [];
	let window = "listTask";

	const changeDone = (index) => {
		const newTasks = [...tasks]; // copie du tableau
		newTasks[index] = { ...newTasks[index], done: !newTasks[index].done };

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
		};
		tasks = [...tasks, task];
		tasks.sort((a, b) => (a.priorite > b.priorite) ? 1 : ((a.priorite < b.priorite) ? -1 : 0));
		changeWindow();
	};

	const changeWindow = () => {
		if(window == "listTask"){
			window = "createTask";
		} else {
			window = "listTask";
		}
	}
</script>

<main>
	<div class="container-fluid">
		<h1 class="text-white fw-bold ff-poppins">TODO List pour les étudiants</h1>
		<h4 class="text-white fw-bold ff-montserrat">Vous n'oublierez plus jamais vos devoirs</h4>
	</div>
	{#if window == "listTask"}
		<ListTask {tasks} {changeDone} {changeWindow} />
	{:else if window == "createTask" }
		<CreateTask {changeWindow} {addTask} />
	{/if}
</main>

<style>
	.ff-montserrat {
		font-family: 'Montserrat', sans-serif;
	}

	.ff-poppins {
		font-family: 'Poppins', sans-serif;
	}
</style>