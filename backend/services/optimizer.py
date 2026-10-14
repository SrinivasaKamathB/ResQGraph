from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import math
from typing import List, Dict, Any
from models.schemas import DispatchPlan

def distance_matrix(incidents, depot):
    nodes = [depot] + incidents
    matrix = []
    for i in range(len(nodes)):
        row = []
        for j in range(len(nodes)):
            if i == j:
                row.append(0)
            else:
                dist = math.sqrt((nodes[i]["lat"] - nodes[j]["lat"])**2 + (nodes[i]["lng"] - nodes[j]["lng"])**2)
                row.append(int(dist * 1000))
        matrix.append(row)
    return matrix

def generate_naive_baseline(incidents: List[Dict[str, Any]], vehicles: int = 2) -> DispatchPlan:
    """FIFO based dispatch."""
    assignments = {f"V{i}": [] for i in range(vehicles)}
    sorted_incidents = sorted(incidents, key=lambda x: x["id"])
    
    for i, inc in enumerate(sorted_incidents):
        v_idx = i % vehicles
        assignments[f"V{v_idx}"].append(inc["id"])
        
    return DispatchPlan(
        id="baseline_plan",
        vehicle_assignments=assignments,
        routes={},
        estimated_times={"total": 0.0}
    )

def optimize_dispatch(incidents: List[Dict[str, Any]], num_vehicles: int = 2) -> DispatchPlan:
    """Uses OR-Tools VRP to optimize dispatch."""
    if not incidents:
        return DispatchPlan(id="empty_plan", vehicle_assignments={}, routes={}, estimated_times={})
        
    depot = {"lat": 12.9716, "lng": 77.5946}
    
    for inc in incidents:
        if inc.get("lat") is None:
            inc["lat"] = depot["lat"]
            inc["lng"] = depot["lng"]
            
    data = {}
    data['distance_matrix'] = distance_matrix(incidents, depot)
    data['num_vehicles'] = num_vehicles
    data['depot'] = 0

    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']),
                                           data['num_vehicles'], data['depot'])
    routing = pywrapcp.RoutingModel(manager)

    def distance_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

    solution = routing.SolveWithParameters(search_parameters)

    assignments = {}
    routes = {}
    
    if solution:
        for vehicle_id in range(data['num_vehicles']):
            index = routing.Start(vehicle_id)
            plan_output = []
            route_distance = 0
            while not routing.IsEnd(index):
                node_index = manager.IndexToNode(index)
                if node_index != 0:
                    plan_output.append(incidents[node_index - 1]["id"])
                previous_index = index
                index = solution.Value(routing.NextVar(index))
                route_distance += routing.GetArcCostForVehicle(previous_index, index, vehicle_id)
                
            assignments[f"V{vehicle_id}"] = plan_output
            routes[f"V{vehicle_id}"] = {"distance": route_distance}
            
    return DispatchPlan(
        id="opt_plan_" + str(len(incidents)),
        vehicle_assignments=assignments,
        routes=routes,
        estimated_times={"total_distance": sum(r["distance"] for r in routes.values())} if routes else {}
    )
