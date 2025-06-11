import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  listContent: {
    padding: 16,
    marginHorizontal: 16, 
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: "#265a47",
  },
  price: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold",
    color: "#265a47",
    marginTop: 4,
  },
  stock: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 15,
  },
  centerArea: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 40,
    fontSize: 18,
    width: width - 70,
  },
  carrolupa: {
    width: 60,
    height: 60,
  },
  user: {
    width: 32,
    height: 32,
  },
  lupa: {
    width: 28,
    height: 28,
  },
});

export default styles;
