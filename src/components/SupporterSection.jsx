import { useEffect, useRef, useState } from 'react';
import { findSupporter, registerSupporter } from '../utils/supporterStore';

export default function SupporterSection({ onCardReady }) {
  const [wardsMap, setWardsMap] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lga, setLga] = useState('');
  const [ward, setWard] = useState('');
  const [joinStatus, setJoinStatus] = useState('');

  const [identifier, setIdentifier] = useState('');
  const [lookupStatus, setLookupStatus] = useState('');

  const [camActive, setCamActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [camStatus, setCamStatus] = useState('');

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);
  const objectUrlRef = useRef('');

  useEffect(() => {
    fetch('/data/wards.json')
      .then(r => r.json())
      .then(data => setWardsMap(data || {}))
      .catch(() => {});
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCamActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const setNewPreview = url => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    objectUrlRef.current = url;
    setPreviewUrl(url);
  };

  const handleStartCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamStatus('Camera is not supported in this browser; try Upload image.');
      return;
    }
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      setCamActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamStatus('Camera ready — tap Capture photo.');
    } catch {
      setCamStatus('Could not access camera. You can still upload an image or submit without one.');
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(
      blob => {
        if (!blob) return;
        setNewPreview(URL.createObjectURL(blob));
        stopCamera();
        setCamStatus('Selfie preview ready (kept on your device only).');
      },
      'image/jpeg',
      0.9,
    );
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    setNewPreview(URL.createObjectURL(file));
    setCamStatus('Photo preview ready (kept on your device only).');
  };

  const handleJoinSubmit = e => {
    e.preventDefault();
    const result = registerSupporter({ name, phone, lga, ward }, wardsMap);
    if (result.ok) {
      setJoinStatus('');
      onCardReady(result.supporter);
    } else {
      setJoinStatus(result.errors.join(' '));
    }
  };

  const handleLookupSubmit = e => {
    e.preventDefault();
    const result = findSupporter(identifier);
    if (result.ok) {
      setLookupStatus('');
      onCardReady(result.supporter);
    } else {
      setLookupStatus(result.errors.join(' '));
    }
  };

  const wardList = wardsMap[lga] || [];

  return (
    <section className="section section-tint" id="involved">
      <div className="shell involve-wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow">Join the Movement</p>
            <h2>Get your HIPE 2.0 Supporter Card</h2>
            <p className="sec-sub">
              Register for your ward and download or print your official supporter ID card.
            </p>
          </div>
        </div>

        <div className="involve-grid">
          <div className="panel-box form-box">
            <h3>Create your Supporter ID Card</h3>
            <p className="panel-sub">Fill in your details below to generate your HIPE 2.0 card.</p>

            <form className="join-form" onSubmit={handleJoinSubmit}>
              <div className="two">
                <div className="f">
                  <label htmlFor="jname">Full name</label>
                  <input
                    id="jname"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="f">
                  <label htmlFor="jphone">Phone number</label>
                  <input
                    id="jphone"
                    name="phone"
                    type="text"
                    required
                    maxLength={20}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="080 0000 0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="two">
                <div className="f">
                  <label htmlFor="jlga">Local government</label>
                  <select
                    id="jlga"
                    name="lga"
                    required
                    value={lga}
                    onChange={e => {
                      setLga(e.target.value);
                      setWard('');
                    }}
                  >
                    <option value="">Select your LGA</option>
                    <option value="Ohaozara">Ohaozara</option>
                    <option value="Onicha">Onicha</option>
                    <option value="Ivo">Ivo</option>
                  </select>
                </div>
                <div className="f">
                  <label htmlFor="jward">Ward</label>
                  <select
                    id="jward"
                    name="ward"
                    required
                    value={ward}
                    onChange={e => setWard(e.target.value)}
                  >
                    <option value="">{lga ? 'Select your ward' : 'Choose your LGA first'}</option>
                    {wardList.map(w => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="camera-field">
                <p className="cam-title">
                  Your photo <span>(optional)</span>
                </p>
                <p className="cam-help">
                  Take a selfie or upload an image — it stays on your device and is not saved.
                </p>
                <input
                  ref={fileInputRef}
                  id="photo"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
                <div className="cam-controls">
                  <button type="button" onClick={handleStartCamera}>
                    Take a selfie
                  </button>
                  <button type="button" onClick={() => fileInputRef.current?.click()}>
                    Upload image
                  </button>
                  {camActive && (
                    <button type="button" onClick={handleCapture}>
                      Capture photo
                    </button>
                  )}
                </div>
                <video
                  ref={videoRef}
                  id="camera-preview"
                  playsInline
                  muted
                  hidden={!camActive}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    className="photo-preview"
                    alt="Selected photo preview"
                  />
                )}
                <p className="cam-status" role="status" aria-live="polite">
                  {camStatus}
                </p>
              </div>

              <p className="form-status" role="status" aria-live="polite">
                {joinStatus}
              </p>
              <button className="btn btn-primary btn-full" type="submit">
                Generate My ID Card
              </button>
            </form>
          </div>

          <div className="side-stack">
            <div className="panel-box lookup-box" id="member-search">
              <h3>Already a member?</h3>
              <p className="panel-sub">
                Find or reprint your HIPE 2.0 card using your Card ID or phone number.
              </p>
              <form className="lookup-form" onSubmit={handleLookupSubmit}>
                <label htmlFor="lookup-id">Card ID or phone number</label>
                <div className="lookup-row">
                  <input
                    id="lookup-id"
                    name="identifier"
                    placeholder="HIPE-XXXX or 080..."
                    required
                    maxLength={40}
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    Find card
                  </button>
                </div>
                <p className="form-status" role="status" aria-live="polite">
                  {lookupStatus}
                </p>
              </form>
            </div>

            <div className="panel-box office-box">
              <h3>Constituency Office</h3>
              <p className="panel-sub">
                Ohaozara / Onicha / Ivo Federal Constituency, Ebonyi State.
              </p>
              <dl className="office-facts">
                <div>
                  <dt>Movement</dt>
                  <dd>Renewed Hope for FON na HIPE 2.0</dd>
                </div>
                <div>
                  <dt>Party</dt>
                  <dd>All Progressives Congress (APC)</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
