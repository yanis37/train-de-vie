import networkx as nx
import codecs
import csv


def write_in_csv(G):

    err = codecs.open("./data/generated/Error.txt", "w", "utf-8")
    header = ['start', 'goal', 'time']

    with open('./data/generated/Insert.csv', 'w', newline='', encoding='UTF8') as f:
        writer = csv.writer(f)

        # write the header
        writer.writerow(header)

        # write the data
        for node in G.nodes:
            length = nx.single_source_dijkstra_path_length(G, node)
            for goal in G.nodes:
                if goal != node:
                    try:
                        writer.writerow([node, goal, str(length[goal])])
                    except:
                        err.write("Error: " + node + "  &   " + goal + "\n\n")

    print("The csv file is completed")


def write_in_sql(G):

    # Open files
    err = codecs.open("../data/generated/Error.txt", "w", "utf-8")
    file = codecs.open("./data/generated/Insert.sql", "w", "utf-8")

    # Write the data
    for node in G.nodes:
        length = nx.single_source_dijkstra_path_length(G, node)
        for goal in G.nodes:
            if goal != node:
                try:
                    file.write("Insert into train values ('" + str(node) + "', '"+ str(goal) + "', "+ str(length[goal])+ ");\n")
                except:
                    err.write("Error: " + node + "  &   " + goal + "\n\n")

    print("The sql file is completed")


