import { BsPrinterFill, BsFileBreakFill } from "react-icons/bs";
import useBoolean from "../../hooks/useBoolean";
import { ChartModal } from "./components/ChartModal/ChartModal";
import ChartCard from "../../components/Template/ChartCard";
import { IComponentCard } from "../../types/Interfaces.type";
import { useExtracts } from "./hooks/useExtracts";

const ExtractsList = () => {
	const [bool, { setTrue, setFalse }] = useBoolean(false);

	const {
		listPages,
		handleDragStart,
		handleDragEnd,
		handleDrop,
		handleDragEnter,
		handleDragLeave,
		handlePrint,
		addNewPage,
	} = useExtracts();

	return (
		<>
			<ChartModal open={bool} setFalse={setFalse} />
			<main className="w-full h-full flex flex-1 flex-col items-center">
				<div className="w-full h-16 bg-gray-950 flex justify-center">
					<div className="w-4/5 h-full flex justify-between items-center px-4">
						<div className="h-7 cursor-pointer border-2 border-white rounded p-1">
							<h2 className="text-white text-sm font-bold" onClick={setTrue}>
								Add Chart
							</h2>
						</div>
						<div className="flex gap-4">
							<div className="cursor-pointer border-2 border-white rounded p-1">
								<BsFileBreakFill size={16} color="white" onClick={() => addNewPage()} />
							</div>
							<div className="cursor-pointer border-2 border-white rounded p-1">
								<BsPrinterFill size={16} color="white" onClick={handlePrint} />
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-full flex flex-wrap justify-center gap-8 py-8 overflow-auto bg-gray-200">
					{listPages.map((page, indexPage) => {
						return (
							<div
								key={indexPage}
								id={page.id}
								className="w-4/5 relative bg-white shadow-md p-6"
								style={{ height: 1122 }}
								onDrop={handleDrop}
								onDragOver={(event) => {
									event.preventDefault();
									handleDragEnter(event, page);
								}}
								onDragLeave={handleDragLeave}
							>
								{page.components.map((component: IComponentCard, index) => {
									if (component.data && component.type) {
										return (
											<ChartCard
												key={index}
												id={component.id}
												type={component.type}
												data={component.data}
												title={component.title}
												x={component.x}
												y={component.y}
												onDragStart={() => handleDragStart(component)}
												onDragEnd={handleDragEnd}
											/>
										);
									}
								})}
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
};

export default ExtractsList;
