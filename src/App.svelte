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
	import { deleteTask } from './stores/tasks.js';

    import EditTask from "./components/editTask.svelte";
    import CreateTask from "./components/createTask.svelte";
    import ListTask from "./components/listTask.svelte";

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
</script>

<main use:links>
	<div class="container-fluid">
		<h1 class="text-white fw-bold ff-poppins">TODO List pour les étudiants</h1>
		<h4 class="text-white fw-bold ff-montserrat">Vous n'oublierez plus jamais vos devoirs</h4>
	</div>
	<Router url="">
		<Route path="/">
			<ListTask {showModalDeleteTask} />
		</Route>
		<Route path="/create">
			<CreateTask />	
		</Route>
		<Route path="/edit/:index" let:params>
			<EditTask index={params.index} />
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
			<Button color="danger" on:click={function(){
				deleteTask(taskToDelete);
				toggle();
			}}>Supprimer</Button>
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