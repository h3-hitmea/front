use App\Entity\User;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class MaterielController extends AbstractController
{
    /**
     * @Route("/prendre", name="prendre_materiel")
     */
    public function prendre(Request $request): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        if (null === $user) {
            throw new AccessDeniedException('Vous devez être connecté pour accéder à cette page.');
        }

        $materiaux = $this->getDoctrine()
            ->getRepository(Materiel::class)
            ->findAll();

        return $this->render('materiel/prendre.html.twig', [
            'materiaux' => $materiaux,
            'user' => $user,
        ]);
    }

    /**
     * @Route("/rendre", name="rendre_materiel")
     */
    public function rendre(Request $request): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        if (null === $user) {
            throw new AccessDeniedException('Vous devez être connecté pour accéder à cette page.');
        }

        $materiaux = $this->getDoctrine()
            ->getRepository(Materiel::class)
            ->findAll();

        return $this->render('materiel/rendre.html.twig', [
            'materiaux' => $materiaux,
            'user' => $user,
        ]);
    }
}
