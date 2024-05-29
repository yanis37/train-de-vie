import networkx as nx
import pandas as pd
import re


def get_stops(folder) :

    stops = pd.read_csv(folder+"/stops.txt",usecols = ['stop_name','stop_id'], sep=",")

    ## stops contains: stop_id, stop_name

    tmp = dict(zip(stops.stop_id, stops.stop_name))
    stops = {}

    # we only register the numbers from the stops ids
    for i in tmp:
        if not re.findall('[0-9]+', i)[0] in stops:
            stops[re.findall('[0-9]+', i)[0]] = tmp.get(i)

    return stops


def get_stop_times(folder):

    stop_times = pd.read_csv(folder+"/stop_times.txt", usecols = ['trip_id','stop_id', 'arrival_time'], encoding='utf-8-sig', sep=",")
    return stop_times


def get_trips(stop_times, stops):

    trips = {}
    # trips = { trip_id: { stop_id: arrival_time, ...}, ...}
    for i in range (len(stop_times)-1):
        if not (stop_times.loc[i]["trip_id"] in trips):
            trips[str(stop_times.loc[i]["trip_id"])] = {re.findall('[0-9]+', stop_times.loc[i]["stop_id"])[0] : stop_times.loc[i]["arrival_time"]}
        else :
            trips[str(stop_times.loc[i]["trip_id"])][re.findall('[0-9]+', stop_times.loc[i]["stop_id"])[0]] = stop_times.loc[i]["arrival_time"]

    return trips



def get_train(trips):

    # train = [temps, ...]
    # temps = { depart : '...', arrivee : '...', tmps_moyen: '...', cmp_trajet: '...'}
    train = []
    temps = {}
    for trajet in trips:
        gare = list(trips.get(trajet).items())
        for i in range(len(gare) - 1):
            toDo = True
            time = (int(gare[i + 1][1].split(':')[0]) * 60 + int(gare[i + 1][1].split(':')[1])) - (
                    int(gare[i][1].split(':')[0]) * 60 + int(gare[i][1].split(':')[1]))
            for done in train:
                if done['depart'] == gare[i][0] and done['arrivee'] == gare[i + 1][0]:
                    done['cmp_trajets'] = done['cmp_trajets'] + 1
                    done['tmps_moyen'] = (done['tmps_moyen'] * (done['cmp_trajets'] - 1) + time) / done['cmp_trajets']
                    toDo = False

            if (toDo):
                temps = {'depart': gare[i][0], 'arrivee': gare[i + 1][0], 'tmps_moyen': time, 'cmp_trajets': 1}
                train.append(temps)
    return train



def get_from_gtfs(folder) :

    print("Start : " + folder)

    ## Convert to data frame as csv
    stop_times = get_stop_times(folder)
    stops = get_stops(folder)
    print("     The data are cast")

    #Get all trips
    trips = get_trips(stop_times, stops)
    print("     Management of trips over")

    # Get distances between stations
    train = get_train(trips)

    print(folder + ": is over !")
    return train



def get_graph(train) :
    edges = []
    for ligne in train:
        edges.append((ligne['depart'], ligne['arrivee'], ligne['tmps_moyen']))

    G = nx.DiGraph()
    G.add_weighted_edges_from(edges)
    print("The graph is generated !")

    return G

