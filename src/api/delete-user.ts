export const deleteUserAPI = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log(`📞 Appel API : Tentative de suppression de l'ID ${id}...`);
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve(`✅ API : ID ${id} supprimé définitivement.`);
      } else {
        reject(
          new Error("❌ API : Erreur lors de la suppression de l'ID ${id}."),
        );
      }
    }, 1000); // Latence réseau simulée
  });
};
