import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  Link as MuiLink,
  Stack,
  Typography
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';

interface EventConfig {
  name: string;
  primaryColor: string;
}

interface HomeProps {
  events: EventConfig[];
}

const EMBED_SNIPPET = `<iframe id="zeitplan"
        src="${window.location.origin}${window.location.pathname}#/ZEITPLAN-JAHR"
        style="border: 0px; min-height: 400px; height: 680px;"
        width="100%"></iframe>
<script>
window.addEventListener("message", (event) => {
  if (event.data.startsWith('resize::')) {
    const height = event.data.replace('resize::', '');
    document.getElementById('zeitplan').style.height = \`\${height}px\`;
  }
}, false);
</script>`;

export default function Home({ events }: HomeProps) {
  const sortedEvents = [...events].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container maxWidth="md" sx={{ paddingY: 5 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, marginBottom: 1 }}>
        Digitaler Zeitplan Tambourenfest
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 4 }}>
        Übersicht aller digitalen Zeitpläne sowie eine kurze Anleitung, wie ein
        neuer Zeitplan erstellt und in eine Vereinswebsite eingebettet werden
        kann.
      </Typography>

      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, marginBottom: 2 }}>
        Verfügbare Zeitpläne
      </Typography>

      {sortedEvents.length === 0 ? (
        <Typography color="text.secondary">
          Aktuell sind keine Zeitpläne verfügbar.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {sortedEvents.map(event => (
            <Card key={event.name} variant="outlined">
              <CardActionArea href={`#/${event.name}`}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      alignSelf: 'stretch',
                      borderRadius: 1,
                      backgroundColor: event.primaryColor
                    }}
                  />
                  <EventNoteIcon sx={{ color: event.primaryColor }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {event.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      #/{event.name}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}

      <Divider sx={{ marginY: 5 }} />

      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, marginBottom: 2 }}>
        Neuen Zeitplan erstellen
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Ein neuer Zeitplan kann ohne Code-Änderungen direkt über die
        Admin-Oberfläche angelegt, aktualisiert oder gelöscht werden:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <MuiLink href="#/admin" sx={{ fontWeight: 600 }}>
          → Zur Admin-Oberfläche
        </MuiLink>
      </Typography>
      <Typography variant="body2" color="text.secondary" component="div">
        Benötigt werden:
        <Box component="ol" sx={{ marginTop: 1, paddingLeft: 3 }}>
          <li><strong>Zeitplan-Name</strong> im Format <code>ort-jahr</code> (z.B. <code>lenzburg-25</code>).</li>
          <li><strong>Primärfarbe</strong> als Hex-Code für die UI des Zeitplans.</li>
          <li><strong>Zeitplan Excel</strong> mit den Vorträgen / Teilnehmer:innen.</li>
          <li><strong>Wettspielorte Excel</strong> mit den Spalten <em>Abkürzung</em> und <em>Google Maps URL</em>.</li>
          <li><strong>GitHub Personal Access Token</strong> mit <code>repo</code>-Berechtigung.</li>
        </Box>
      </Typography>

      <Divider sx={{ marginY: 5 }} />

      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, marginBottom: 2 }}>
        Zeitplan einbetten
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Um einen Zeitplan per <code>iframe</code> in eine andere Website
        einzubetten, kann der folgende Code verwendet werden.{' '}
        <code>ZEITPLAN-JAHR</code> durch den Namen des gewünschten Zeitplans
        ersetzen (z.B. <code>lenzburg-25</code>):
      </Typography>
      <Box
        component="pre"
        sx={{
          backgroundColor: '#f5f5f5',
          padding: 2,
          borderRadius: 1,
          border: '1px solid #ddd',
          fontSize: '0.875rem',
          fontFamily: 'monospace',
          overflow: 'auto',
          whiteSpace: 'pre-wrap'
        }}
      >
        {EMBED_SNIPPET}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ marginTop: 1, display: 'block' }}>
        Das Script sorgt dafür, dass die Höhe des iframes automatisch an den Inhalt angepasst wird.
      </Typography>

      <Box sx={{ marginTop: 6, color: 'text.secondary', fontSize: 14 }}>
        <MuiLink href="https://github.com/randombenj/digitaler-zeitplan-tambourenfest" target="_blank" rel="noreferrer">
          github.com/randombenj/digitaler-zeitplan-tambourenfest
        </MuiLink>
      </Box>
    </Container>
  );
}
