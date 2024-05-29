from python_modules.modules import gtfs as gtfs
from python_modules.modules import data_save as mod


def main() :

    # Convert gtfs into a list that can be used to generate a graph
    ter = gtfs.get_from_gtfs("./data/source/ter")
    tgv = gtfs.get_from_gtfs("./data/source/tgv")
    intercites = gtfs.get_from_gtfs("./data/source/intercites")
    transilien = gtfs.get_from_gtfs("./data/source/transilien")

    train = ter + intercites + tgv + transilien

    # Generate a graph from the gtfs data
    G = gtfs.get_graph(train)

    # write into a specific file
    mod.write_in_csv(G)

if __name__ == "__main__":
    main()













