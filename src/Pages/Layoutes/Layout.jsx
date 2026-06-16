import Header from "../../Components/Header/Header";
function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--total-header)" }}>{children}</main>
    </>
  );
}

export default Layout;
